import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

// 🔹 Schema xác thực login
const loginFormSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .refine(
      (val) => val.endsWith("@troy.edu") || val.endsWith("@sis.hust.edu.vn"),
      "Email must end with @troy.edu or @sis.hust.edu.vn"
    ),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { logIn } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await logIn(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      // Bạn có thể thêm logic để hiển thị thông báo lỗi cho người dùng ở đây
      // ví dụ: sử dụng toast notification hoặc set một state lỗi.
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex flex-col items-center text-center gap-2">
                <a href="/" className="mx-auto block w-fit text-center">
                  <img
                    src="/troycourselab_logo.svg"
                    alt="TroyCourseLab Logo"
                    className="h-12"
                  />
                </a>
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                <p className="text-muted-foreground text-balance text-sm">
                  Log in to continue your Troy Course Lab journey.
                </p>
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-3">
                <label htmlFor="email" className="block text-sm">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-3">
                <label htmlFor="password" className="block text-sm">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full text-bold text-white bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>

              {/* Register Link */}
              <div className="text-center text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Register here
                </a>
                .
              </div>
            </div>
          </form>

          {/* Right-side Image */}
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover object-[25%_50%]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="px-6 text-center text-sm text-balance md:px-0 *:[a]:underline underline-offset-4 text-muted-foreground *[a]:hover:text-primary">
        By signing in, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
