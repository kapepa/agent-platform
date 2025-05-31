"use client"

import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Routers } from "@/types/routers";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { DashboardUserButton } from "./dashboard-user-button";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: Routers.Meetings,
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: Routers.Agents,
  },
]

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: Routers.Upgrade,
  },
]

const DashboardSidebar: FC = () => {
  const pathname = usePathname();


  return (
    <Sidebar>
      <SidebarHeader
        className="text-sidebar-accent-foreground"
      >
        <Link
          href={Routers.Home}
          className="flex items-center gap-2 px-2 pt-2"
        >
          <Image
            src="/logo.svg"
            alt="logo"
            height={36}
            width={36}
          />
          <p
            className="text-2xl font-semibold"
          >
            Meet.AI
          </p>
        </Link>
      </SidebarHeader>
      <div
        className="px-4 py-2"
      >
        <Separator
          className="opacity-10 text-[#5D6B68]"
        />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                firstSection.map((item, index) => (
                  <SidebarMenuItem
                    key={`${item.href}-${item.label}-${index}`}
                  >
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-sidebar/50 to-sidebar/50",
                        pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10"
                      )}
                      isActive={pathname === item.href}
                    >
                      <Link
                        href={item.href}
                      >
                        <item.icon
                          className="size-5"
                        />
                        <span
                          className="text-sm font-medium tracking-tighter"
                        >
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div
          className="px-4 py-2"
        >
          <Separator
            className="opacity-10 text-[#5D6B68]"
          />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                secondSection.map((item, index) => (
                  <SidebarMenuItem
                    key={`${item.href}-${item.label}-${index}`}
                  >
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-sidebar/50 to-sidebar/50",
                        pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10"
                      )}
                      isActive={pathname === item.href}
                    >
                      <Link
                        href={item.href}
                      >
                        <item.icon
                          className="size-5"
                        />
                        <span
                          className="text-sm font-medium tracking-tighter"
                        >
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter
        className="text-white"
      >
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  )
}

export { DashboardSidebar }