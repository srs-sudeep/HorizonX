import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProductsSection = () => {
  return (
    <Card className="col-span-12 md:col-span-4 bg-blue-500 text-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Best selling products</CardTitle>
        <p className="text-sm opacity-80">Overview 2023</p>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="mt-4 bg-white/10 rounded-lg p-4">
          <img
            src="https://placehold.co/100x60/white/white?text=Interface"
            alt="Product interface"
            className="w-full h-auto rounded-md"
          />
          <div className="mt-4">
            <h4 className="font-medium">Material UI Dashboard</h4>
            <p className="text-sm opacity-80 mt-1">Premium admin template</p>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold">$4,320</span>
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">+54%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsSection;
