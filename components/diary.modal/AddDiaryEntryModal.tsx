"use client";

import Modal from "@/components/Modal/modal";
import AddDiaryEntryForm from "./AddDiaryEntryForm";
import type { DiaryNote } from "@/types/diary";
import css from "./AddDiaryEntryModal.module.css";

interface AddDiaryEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  note?: DiaryNote;
}

export default function AddDiaryEntryModal({
  isOpen,
  onClose,
  note,
}: AddDiaryEntryModalProps) {
  const title = note ? "Редагувати запис" : "Новий запис";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.container}>
        <header>
          <h2 className={css.title}>{title}</h2>
          <button
            className={css.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </header>

        <AddDiaryEntryForm note={note} onClose={onClose} />
      </div>
    </Modal>
  );
}
