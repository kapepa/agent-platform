"use client"

import { useIsMobile } from "@/hooks/use-mobile";
import { FC, ReactNode } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

interface ResponsiveDialogProps {
  title: string,
  description: string,
  children: ReactNode,
  open: boolean,
  onOpenChange: (open: boolean) => void,
}

const ResponsiveDialog: FC<ResponsiveDialogProps> = (props) => {
  const { open, title, children, description, onOpenChange } = props;
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {title}
            </DrawerTitle>
            <DrawerDescription>
              {description}
            </DrawerDescription>
          </DrawerHeader>
          <div
            className="p-4"
          >
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export { ResponsiveDialog }