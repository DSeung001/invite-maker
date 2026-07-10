import { FEEDBACK_FORM_URL, FEEDBACK_UI } from "@/lib/invite-i18n";
import type { InviteLanguage } from "@/lib/invite-types";

type Props = {
  language: InviteLanguage;
};

export default function DeveloperFeedback({ language }: Props) {
  const { label } = FEEDBACK_UI[language];

  return (
    <div className="developer-feedback">
      <a
        className="btn btn-secondary developer-feedback-link"
        href={FEEDBACK_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    </div>
  );
}
