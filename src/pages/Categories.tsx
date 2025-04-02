import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon, TrashIcon } from "lucide-react";
import useExpenses from "@/hooks/useExpenses";
import GlassCard from "@/components/ui/GlassCard";

const Categories = () => {
  const { categories, addCategory, removeCategory } = useExpenses();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#4F46E5");

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    addCategory({
      name: newCategoryName.trim(),
      color: newCategoryColor,
      icon: "tag",
    });

    setNewCategoryName("");
    setNewCategoryColor("#4F46E5");
  };

  const filteredCategories = categories.filter(
    (category) => category.id !== "income"
  );

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-semibold mb-1">
        Categories
      </h1>
      <p className="text-muted-foreground mb-8">
        Manage your expense categories
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GlassCard className="p-6 md:col-span-1">
          <h2 className="text-xl font-semibold mb-6">Add New Category</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g., Entertainment"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex gap-2">
                <Input
                  id="color"
                  type="color"
                  value={newCategoryColor}
                  onChange={(e) => setNewCategoryColor(e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={newCategoryColor}
                  onChange={(e) => setNewCategoryColor(e.target.value)}
                  placeholder="#HEX"
                  className="flex-1"
                />
              </div>
            </div>
            <Button
              className="w-full"
              onClick={handleAddCategory}
              disabled={!newCategoryName.trim()}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>
        </GlassCard>

        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Your Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden group">
                <CardContent className="p-0">
                  <div
                    className="w-full h-2"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{category.name}</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCategory(category.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
