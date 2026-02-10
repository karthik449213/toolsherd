  import React, { useMemo, useState } from "react";
  import type { LucideIcon } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";

  export interface CategoryItem {
    id: string;
    name: string;
    icon?: LucideIcon | null;
  }

  interface CategorySheetProps {
    categories: CategoryItem[];
    activeCategory: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (id: string) => void;
  }

  /**
   * CategorySheet
   * - Mobile-first full-screen sheet to pick a category
   * - Includes a quick filter input
   * - Only rendered/visible on mobile (md:hidden)
   */
 const CategorySheet: React.FC<CategorySheetProps> = ({
    categories,
    activeCategory,
    open,
    onOpenChange,
    onSelect,
  }) => {
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      if (!q) return categories;
      return categories.filter((c) => c.name.toLowerCase().includes(q));
    }, [categories, query]);

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-0 w-[calc(100vw-1rem)] max-w-none md:hidden bg-slate-900 border border-cyan-500/20">
          <DialogHeader className="px-4 pt-4 pb-2 border-b border-cyan-500/20 bg-slate-800/50">
            <DialogTitle className="text-cyan-100 font-mono">Select Category</DialogTitle>
            <DialogDescription className="text-slate-300">Quickly filter and choose a category</DialogDescription>
          </DialogHeader>

          <div className="p-4 space-y-3 bg-slate-900">
            <Input
              placeholder="Filter categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-cyan-500/40 focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/30 bg-slate-800/60 text-cyan-100 placeholder-slate-400"
            />

            <div className="max-h-[60vh] overflow-y-auto -mx-1 pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filtered.map((cat) => {
                  const Icon = cat.icon || null;
                  const isActive = activeCategory === cat.id;
                  return (
                    <Button
                      key={cat.id}
                      onClick={() => onSelect(cat.id)}
                      className={`justify-start px-3 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-cyan-500 text-gray-950 hover:bg-cyan-400 shadow-glow-medium font-semibold"
                          : "bg-slate-800/60 text-slate-200 border border-cyan-500/20 hover:border-cyan-500/40 hover:bg-slate-700/60"
                      }`}
                      aria-pressed={isActive}
                    >
                      {Icon ? <Icon className="h-4 w-4 mr-2" /> : null}
                      <span className="truncate">{cat.name}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="pt-1">
              <Button
                onClick={() => onOpenChange(false)}
                className="w-full rounded-xl bg-slate-800/60 text-slate-200 border border-cyan-500/20 hover:border-cyan-500/40 hover:bg-slate-700/60 transition-all duration-300"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  export default CategorySheet;