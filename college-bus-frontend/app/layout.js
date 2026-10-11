import "./globals.css";

export const metadata = {
  title: "College Bus Management",
  description: "College Bus Route Optimization and ETA Prediction"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
