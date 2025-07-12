import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogContent, Input } from '@/components';
import { Search, X, Command } from 'lucide-react';

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Close on Escape
      if (event.key === 'Escape') {
        onClose();
      }
      
      // Open with Ctrl/Cmd + K
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        if (!isOpen) {
          // This would need to be handled by the parent component
          // For now, we'll just focus the search input when open
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    }
  }, [isOpen]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search functionality
    console.log('Searching for:', query);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 border-0 bg-transparent shadow-none">
        <div className="relative">
          {/* Translucent backdrop */}
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm" onClick={onClose} />
          
          {/* Search card */}
          <div className="relative bg-card border rounded-xl shadow-2xl p-6 mx-4 mt-20">
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-input"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-10 h-12 text-lg border-0 bg-muted/50 focus:bg-background transition-colors"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">⌘</span>K
                </kbd>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Search results placeholder */}
            {searchQuery && (
              <div className="mt-4 space-y-2">
                <div className="text-sm text-muted-foreground">
                  Search results for "{searchQuery}" will appear here...
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors">
                    <div className="font-medium">Sample Result 1</div>
                    <div className="text-sm text-muted-foreground">This is a sample search result</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors">
                    <div className="font-medium">Sample Result 2</div>
                    <div className="text-sm text-muted-foreground">Another sample search result</div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick actions when no search query */}
            {!searchQuery && (
              <div className="mt-6 space-y-4">
                <div className="text-sm font-medium text-muted-foreground">Quick Actions</div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left">
                    <div className="font-medium text-sm">Go to Dashboard</div>
                    <div className="text-xs text-muted-foreground">Navigate to main dashboard</div>
                  </button>
                  <button className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left">
                    <div className="font-medium text-sm">Settings</div>
                    <div className="text-xs text-muted-foreground">Open settings panel</div>
                  </button>
                  <button className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left">
                    <div className="font-medium text-sm">Profile</div>
                    <div className="text-xs text-muted-foreground">View your profile</div>
                  </button>
                  <button className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left">
                    <div className="font-medium text-sm">Help</div>
                    <div className="text-xs text-muted-foreground">Get help and support</div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 