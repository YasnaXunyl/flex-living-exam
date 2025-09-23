"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Building2,
  Calendar,
  CreditCard,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function ManagerDashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/manager/properties">
          <Card className="p-4 border-2 border-primary hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-primary">Properties</p>
                <p className="text-xs text-muted-foreground">
                  Manage your properties
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 ml-auto text-primary" />
            </div>
          </Card>
        </Link>

        <Card className={cn("p-4 border-2 opacity-50 cursor-not-allowed")}>
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Bookings</p>
              <p className="text-xs text-muted-foreground">View reservations</p>
            </div>
          </div>
        </Card>

        <Card className={cn("p-4 border-2 opacity-50 cursor-not-allowed")}>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Guests</p>
              <p className="text-xs text-muted-foreground">
                Manage guest profiles
              </p>
            </div>
          </div>
        </Card>

        <Card className={cn("p-4 border-2 opacity-50 cursor-not-allowed")}>
          <div className="flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Payments</p>
              <p className="text-xs text-muted-foreground">
                Transaction history
              </p>
            </div>
          </div>
        </Card>

        <Card className={cn("p-4 border-2 opacity-50 cursor-not-allowed")}>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Settings</p>
              <p className="text-xs text-muted-foreground">
                Manage your account
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="col-span-full p-6">
          <h3 className="font-semibold text-lg mb-4">Quick Stats</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Total Properties
              </p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Active Listings
              </p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Total Bookings
              </p>
              <p className="text-2xl font-bold">124</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
