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
                    {t("nav.products")}
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold">{t("nav.services")}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink 
                          href="/services"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/10 to-primary/5 p-6 no-underline outline-none focus:shadow-md border border-primary/10"
                        >
                            <div className="mb-2 mt-4 text-xl font-extrabold text-primary">
                              {t("nav.consulting")}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground font-medium">
                              {t("nav.consulting_desc")}
                            </p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink 
                          href="/services/training-and-results" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                            <div className="text-sm font-bold leading-none">{t("nav.training")}</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                              {t("nav.training_desc")}
                            </p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink 
                          href="/services/equipe-software" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                            <div className="text-sm font-bold leading-none">{t("nav.equipe")}</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                              {t("nav.equipe_desc")}
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
        <div className="flex items-center space-x-1 sm:space-x-4">
          <div className="hidden xs:block">
            <LanguageSwitcher />
          </div>
          
          <SearchDialog>
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex hover:bg-primary/5 hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
              <span className="sr-only">{t("nav.search_sr")}</span>
            </Button>
          </SearchDialog>
          
          <UserMenu />
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">{t("nav.cart")}</span>
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
              <SheetTrigger render={<Button variant="ghost" size="icon" className="h-9 w-9" />}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full py-6">
                  <Link href="/" className="mb-8 px-2">
                    <Image 
                      src="/eqilologo.jpeg" 
                      alt="Eqilo.fi Logo" 
                      width={120} 
                      height={40} 
                      className="h-8 w-auto object-contain"
                    />
                  </Link>
                  
                  <div className="space-y-6 px-2">
                    <Link href="/shop" className="text-xl font-bold flex items-center gap-3 py-2" prefetch={true}>
                      <div className="p-2 bg-primary/10 rounded-lg"><ShoppingCart className="w-5 h-5 text-primary" /></div>
                      {t("nav.products")}
                    </Link>
                    
                    <div className="space-y-4 pt-4 border-t">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">{t("nav.services")}</p>
                      <div className="grid gap-2">
                        <Link href="/services" className="text-lg font-semibold px-2 py-2 rounded-md hover:bg-accent" prefetch={false}>{t("nav.consulting")}</Link>
                        <Link href="/services/training-and-results" className="text-md font-medium text-muted-foreground px-2 py-2 rounded-md hover:bg-accent" prefetch={false}>{t("nav.training")}</Link>
                        <Link href="/services/equipe-software" className="text-md font-medium text-muted-foreground px-2 py-2 rounded-md hover:bg-accent" prefetch={false}>{t("nav.equipe")}</Link>
                      </div>
                    </div>

                    <div className="xs:hidden pt-4 border-t">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2 mb-2">{t("nav.language")}</p>
                      <div className="px-2">
                        <LanguageSwitcher />
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t px-2">
                    <Link href="/admin" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 px-2 py-3 rounded-md hover:bg-accent" prefetch={false}>
                       <User className="w-4 h-4" /> {t("nav.admin")}
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
