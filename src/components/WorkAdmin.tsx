import React, { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical, Save, X } from 'lucide-react';
import workItemsData from '../data/workItems.json';

interface WorkItem {
  id: number;
  url: string;
  description: string;
  order: number;
  title?: string;
  date?: string;
}

const WorkAdmin: React.FC = () => {
  const [workItems, setWorkItems] = useState<WorkItem[]>(workItemsData);
  const [isAdding, setIsAdding] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  useEffect(() => {
    // Sort by order on mount only
    setWorkItems(prevItems => [...prevItems].sort((a, b) => a.order - b.order));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddItem = async () => {
    if (!newUrl || !newDescription) return;

    // Fetch metadata from URL
    try {
      const response = await fetch(
        `https://api.microlink.io/?url=${encodeURIComponent(newUrl)}`
      );
      const data = await response.json();

      const newItem: WorkItem = {
        id: Date.now(),
        url: newUrl,
        description: newDescription,
        title: data.data?.title || 'Untitled Project',
        date: new Date().getFullYear().toString(),
        order: workItems.length + 1,
      };

      setWorkItems([...workItems, newItem]);
      setNewUrl('');
      setNewDescription('');
      setIsAdding(false);
    } catch (error) {
      console.error('Error fetching metadata:', error);
      alert('Could not fetch metadata from URL. Please check the URL and try again.');
    }
  };

  const handleDelete = (id: number) => {
    const filtered = workItems.filter((item) => item.id !== id);
    // Reorder remaining items
    const reordered = filtered.map((item, index) => ({
      ...item,
      order: index + 1,
    }));
    setWorkItems(reordered);
  };

  const handleDragStart = (id: number) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === targetId) return;

    const draggedIndex = workItems.findIndex((item) => item.id === draggedItem);
    const targetIndex = workItems.findIndex((item) => item.id === targetId);

    const newItems = [...workItems];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removed);

    // Update order
    const reordered = newItems.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    setWorkItems(reordered);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleSave = () => {
    const dataStr = JSON.stringify(workItems, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workItems.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-light">Featured Work Admin</h1>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save JSON
          </button>
        </div>

        {/* Add New Item Form */}
        {isAdding ? (
          <div className="mb-8 p-6 border border-border rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-light">Add New Project</h3>
              <button
                onClick={() => setIsAdding(false)}
                className="text-muted-foreground hover:text-accent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">URL</label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Project description..."
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>
              <button
                onClick={handleAddItem}
                className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-colors"
              >
                Add Project
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="mb-8 w-full px-6 py-4 border-2 border-dashed border-border rounded-2xl hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Project
          </button>
        )}

        {/* Work Items List */}
        <div className="space-y-4">
          {workItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item.id)}
              onDragOver={(e) => handleDragOver(e, item.id)}
              onDragEnd={handleDragEnd}
              className={`p-6 border border-border rounded-2xl cursor-move hover:border-accent transition-all ${
                draggedItem === item.id ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <GripVertical className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-light mb-1">
                        {item.title || 'Loading...'}
                      </h3>
                      <p className="text-sm text-accent">{item.date || 'N/A'}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline mb-2 block"
                  >
                    {item.url}
                  </a>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkAdmin;
