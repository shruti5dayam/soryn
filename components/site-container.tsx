// The three content widths defined in app/globals.css.
// Tailwind only generates classes it can find written out in full,
// so the class names are spelled out here rather than built from strings.
const widths = {
  wide: "max-w-wide", // 1200px
  medium: "max-w-medium", // 960px
  reading: "max-w-reading", // 740px
};

type SiteContainerProps = {
  size?: keyof typeof widths;
  className?: string;
  children: React.ReactNode;
};

// Centers content at a chosen maximum width, with side padding that grows
// on larger screens (20px mobile, 32px tablet, 48px desktop).
// The padding sits outside the max width, so a "reading" container
// really gives the text 740px.
export default function SiteContainer({
  size = "wide",
  className = "",
  children,
}: SiteContainerProps) {
  return (
    <div className="px-5 sm:px-8 lg:px-12">
      <div className={`mx-auto w-full ${widths[size]} ${className}`}>
        {children}
      </div>
    </div>
  );
}
