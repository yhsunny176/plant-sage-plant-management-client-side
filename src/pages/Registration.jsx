import RegistrationForm from "@/components/forms/RegistrationForm";
import registerBanner from "@/assets/Banner/register-banner.png";

const Registration = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center lg:flex-row bg-background-body overflow-hidden">
            {/* Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
                <div className="w-full max-w-md">
                    <RegistrationForm />
                </div>
            </div>

            {/* Image Section */}
            <div className="hidden lg:block lg:w-1/2 relative h-full">
                <img
                    src={registerBanner}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Registration banner"
                />
            </div>
        </div>
    );
};

export default Registration;
