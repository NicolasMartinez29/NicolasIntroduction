type Tone = 'coral' | 'cyan' | 'mint' | 'warm' | 'violet';
type Size = 'sm' | 'md' | 'lg' | 'xl';

type Props = {
  initials: string;
  tone?: Tone;
  size?: Size;
};

export default function Avatar({ initials, tone = 'coral', size = 'md' }: Props) {
  return <span className={`avatar avatar-${size} ${tone === 'coral' ? '' : tone}`}>{initials}</span>;
}

export function AvatarStack({
  items
}: {
  items: { initials: string; tone?: Tone }[];
}) {
  return (
    <span className="avatar-stack">
      {items.map((it, i) => (
        <Avatar key={i} initials={it.initials} tone={it.tone} size="sm" />
      ))}
    </span>
  );
}
