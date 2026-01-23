"use client";

import Image from "next/image";
import { Bolt, Moon, Sun, User2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SignInButton, useUser } from "@clerk/nextjs";
import UsageCreditProgress from "./UsageCreditProgress";

export function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Arc logo"
              width={40}
              height={40}
              className="rounded"
            />
            <h1 className="text-lg font-semibold">Arc — Unified</h1>
          </div>

          {/* Hydration-safe theme toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>

        {user && (
          <div className="px-3 pt-4">
            <Button className="w-full">+ New Chat</Button>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-3 pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Chat
          </h2>
          {!user && (
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to chat with our multi-model AI
            </p>
          )}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-3 mb-10">
          {!user ? (
            <SignInButton mode="modal">
              <Button size="lg" className="w-full">
                Sign In / Sign Up
              </Button>
            </SignInButton>
          ) : (
            <div>
              <UsageCreditProgress />
              <Button className="w-full mb-3">
                <Bolt className="mr-2" />
                Upgrade
              </Button>
              <Button
                className="w-full flex items-center justify-start"
                variant="ghost"
              >
                <User2 className="mr-2" />
                <h2>Settings</h2>
              </Button>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
