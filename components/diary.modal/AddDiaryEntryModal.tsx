"use client";

import Modal from "@/components/Modal/modal";
import AddDiaryEntryForm from "./AddDiaryEntryForm";
import type { Note } from "@/types/diary";

interface AddDiaryEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  note?: Note;
}

export default function AddDiaryEntryModal({
  isOpen,
  onClose,
  note,
}: AddDiaryEntryModalProps) {
  const title = note ? "Редагувати запис" : "Новий запис";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <header>
          <h2>{title}</h2>
          <button onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <AddDiaryEntryForm note={note} onClose={onClose} />
      </div>
    </Modal>
  );
}
