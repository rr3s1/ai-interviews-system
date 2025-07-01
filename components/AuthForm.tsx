"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormField from "./FormField";


// A function to generate a dynamic Zod schema based on the form type.
const authFormSchema = (type: string) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    });
};

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const isSignIn = type === "sign-in";

    // Initialize the form schema and hook form instance.
    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", email: "", password: "" },
    });

    // Handle form submission for both sign-up and sign-in.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            if (type === "sign-up") {
                // Handle user registration with Firebase and your backend.

                toast.success("Account created successfully. Please sign in.");
                router.push("/sign-in");
            } else {
                // Handle user sign-in with Firebase and your backend.
                toast.success("Signed in successfully.");
                router.push("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(`There was an error: ${error}`);
        }
    };

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                {/* Header with logo and application name */}
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">PrepWise</h2>
                </div>
                <h3>Practice job interviews with AI</h3>

                {/* The main form structure */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                        {/* Conditionally render the name field for sign-up */}
                        {!isSignIn && (
                            <FormField control={form.control} name="name" label="Name" placeholder="Your Name" />
                        )}
                        <FormField control={form.control} name="email" label="Email" placeholder="Your email address" type="email" />
                        <FormField control={form.control} name="password" label="Password" placeholder="Enter your password" type="password" />

                        {/* Dynamic submit button */}
                        <Button className="btn" type="submit">
                            {isSignIn ? "Sign In" : "Create an Account"}
                        </Button>
                    </form>
                </Form>

                {/* Dynamic link to switch between sign-in and sign-up */}
                <p className="text-center">
                    {isSignIn ? "No account yet?" : "Have an account already?"}
                    <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary ml-1">
                        {!isSignIn ? "Sign In" : "Sign Up"}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;