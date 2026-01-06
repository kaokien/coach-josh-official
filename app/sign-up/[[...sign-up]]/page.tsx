// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#F2E8DC] flex items-center justify-center p-4">
      <SignUp 
        appearance={{
          elements: {
            rootBox: "mx-auto w-full max-w-md",
            card: "border-4 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none bg-white",
            headerTitle: "font-display text-2xl uppercase",
            headerSubtitle: "font-body",
            formButtonPrimary: "bg-[#4A6FA5] hover:bg-[#4A6FA5]/90 border-2 border-[#1A1A1A] rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-display uppercase tracking-wider",
            formFieldInput: "border-2 border-[#1A1A1A] rounded-none font-body focus:border-[#4A6FA5] focus:ring-0",
            formFieldLabel: "font-body font-bold",
            footerActionLink: "text-[#4A6FA5] hover:text-[#D1495B] font-body",
          },
        }}
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/cornerman"
      />
    </div>
  );
}
