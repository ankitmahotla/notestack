import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type EditNoteDialogProps = {
  noteContent: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (newContent: string) => void;
};

export function EditNoteDialog({
  noteContent,
  open,
  onOpenChange,
  onSave,
}: EditNoteDialogProps) {
  const [content, setContent] = React.useState(noteContent);

  React.useEffect(() => {
    setContent(noteContent);
  }, [noteContent]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>
            Make changes to your note below.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        <DialogFooter>
          <Button onClick={() => onSave(content)}>Save</Button>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
