"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { useCart } from "@/components/cart-provider";
import { Badge } from "@/components/ui/badge";
import { SearchDialog } from "./SearchDialog";
import { UserMenu } from "./UserMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";

import { useLanguage } from "@/components/language-provider";

export function Header() {
  const { itemCount } = useCart();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 font-sans antialiased">
      <div className="container flex h-16 items-center justify-between">
        
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/eqilologo.jpeg" 
              alt="Eqilo.fi Logo" 
              width={120} 
              height={40} 
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav (Megamenu) */}
          <div className="hidden md:flex font-bold">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/shop" className={navigationMenuTriggerStyle()}>
                    Products
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold">Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink 
                          href="/services"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/10 to-primary/5 p-6 no-underline outline-none focus:shadow-md border border-primary/10"
                        >
                            <div className="mb-2 mt-4 text-xl font-extrabold text-primary">
                              Eqilo Consulting
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground font-medium">
                              20+ years of expertise in competition and timekeeping systems.
                            </p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink 
                          href="/services/training-and-results" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                            <div className="text-sm font-bold leading-none">Training & Results</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                              On-site operations and staff training.
                            </p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink 
                          href="/services/equipe-software" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                            <div className="text-sm font-bold leading-none">Equipe Software</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                              The standard for equestrian show management.
                            </p>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <LanguageSwitcher />
          
          <SearchDialog>
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex hover:bg-primary/5 hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search products</span>
            </Button>
          </SearchDialog>
          
          <UserMenu />
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-bold bg-primary border-2 border-background animate-in zoom-in">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col space-y-6 mt-6">
                  <Link href="/" className="mb-4 px-2">
                    <Image 
                      src="/eqilologo.jpeg" 
                      alt="Eqilo.fi Logo" 
                      width={120} 
                      height={40} 
                      className="h-8 w-auto object-contain"
                    />
                  </Link>
                  
                  <div className="space-y-4 px-2">
                    <Link href="/shop" className="text-lg font-bold flex items-center gap-3" prefetch={true}>
                      <div className="p-2 bg-muted rounded-lg"><ShoppingCart className="w-5 h-5 text-primary" /></div>
                      Products
                    </Link>
                    <div className="space-y-2 pt-2 border-t">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2 mb-2">Expert Services</p>
                      <Link href="/services" className="text-md font-semibold flex items-center gap-3 px-2 py-1" prefetch={false}>Consulting Overview</Link>
                      <Link href="/services/training-and-results" className="text-sm font-medium text-muted-foreground flex items-center gap-3 px-2 py-1" prefetch={false}>Training & Results</Link>
                      <Link href="/services/equipe-software" className="text-sm font-medium text-muted-foreground flex items-center gap-3 px-2 py-1" prefetch={false}>Equipe Software</Link>
                    </div>
                  </div>

                  <div className="pt-6 border-t px-4 mt-auto">
                    <Link href="/admin" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2" prefetch={false}>
                       <User className="w-3 h-3" /> Admin Portal
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}
