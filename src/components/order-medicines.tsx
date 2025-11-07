"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const popularMedicines = [
  { id: 1, name: 'Paracetamol 500mg', price: 20 },
  { id: 2, name: 'Metformin 500mg', price: 50 },
  { id: 3, name: 'Amlodipine 5mg', price: 45 },
  { id: 4, name: 'Atorvastatin 10mg', price: 70 },
];

export function OrderMedicines() {
    const [cart, setCart] = useState<Map<number, number>>(new Map());
    const { toast } = useToast();

    const addToCart = (id: number) => {
        const newCart = new Map(cart);
        newCart.set(id, (newCart.get(id) || 0) + 1);
        setCart(newCart);
    };
    
    const removeFromCart = (id: number) => {
        const newCart = new Map(cart);
        const currentQuantity = newCart.get(id) || 0;
        if (currentQuantity > 1) {
            newCart.set(id, currentQuantity - 1);
        } else {
            newCart.delete(id);
        }
        setCart(newCart);
    };

    const handleCheckout = () => {
        if (cart.size === 0) {
            toast({
                variant: 'destructive',
                title: "Your cart is empty",
                description: "Please add items to your cart before checking out."
            })
            return;
        }

        toast({
            title: "Order Placed!",
            description: "Your medicines are on their way."
        });
        setCart(new Map());
    }

    const getTotalItems = () => {
        return Array.from(cart.values()).reduce((acc, curr) => acc + curr, 0);
    }

    const getTotalPrice = () => {
        return Array.from(cart.entries()).reduce((acc, [id, quantity]) => {
            const med = popularMedicines.find(m => m.id === id);
            return acc + (med ? med.price * quantity : 0);
        }, 0)
    }

  return (
    <div className="grid gap-6 md:grid-cols-3">
        <div className='md:col-span-2'>
            <Card>
                <CardHeader>
                    <CardTitle>Order Medicines</CardTitle>
                    <CardDescription>Search for medicines and add them to your cart.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex w-full items-center space-x-2 mb-6">
                        <Input type="text" placeholder="Search for medicines..." />
                        <Button type="submit" size="icon">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className='space-y-4'>
                        <h3 className='font-semibold'>Popular Medicines</h3>
                        {popularMedicines.map(med => (
                            <div key={med.id} className='flex items-center justify-between p-3 bg-muted/50 rounded-lg'>
                               <div>
                                    <p className='font-medium'>{med.name}</p>
                                    <p className='text-sm text-muted-foreground'>₹{med.price}</p>
                               </div>
                               <div className='flex items-center gap-2'>
                                    {cart.has(med.id) ? (
                                        <div className="flex items-center gap-2">
                                            <Button size="icon" variant="ghost" onClick={() => removeFromCart(med.id)}><Minus className="h-4 w-4"/></Button>
                                            <span className="font-bold">{cart.get(med.id)}</span>
                                            <Button size="icon" variant="ghost" onClick={() => addToCart(med.id)}><Plus className="h-4 w-4"/></Button>
                                        </div>
                                    ) : (
                                        <Button onClick={() => addToCart(med.id)}>Add to cart</Button>
                                    )}
                               </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Cart</CardTitle>
                    <CardDescription>Review your items before checkout.</CardDescription>
                </CardHeader>
                <CardContent>
                    {cart.size > 0 ? (
                        <ul className='space-y-2'>
                            {Array.from(cart.entries()).map(([id, quantity]) => {
                                const med = popularMedicines.find(m => m.id === id);
                                if (!med) return null;
                                return (
                                    <li key={id} className='flex justify-between text-sm'>
                                        <span>{med.name} x {quantity}</span>
                                        <span>₹{med.price * quantity}</span>
                                    </li>
                                )
                            })}
                             <li className='flex justify-between font-bold text-base pt-2 border-t'>
                                <span>Total</span>
                                <span>₹{getTotalPrice()}</span>
                            </li>
                        </ul>
                    ): (
                        <p className='text-muted-foreground text-center'>Your cart is empty.</p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleCheckout} disabled={cart.size === 0}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Checkout ({getTotalItems()})
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
