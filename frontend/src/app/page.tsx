"use client";
import NavigationMain from "@/components/NavigationMain";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <NavigationMain />
      <div className="container pt-40 mx-auto">
        <div className="flex flex-col lg:flex-row text-6xl font-bold">
          <div className="flex-1">
            Enhance Academic Excellence with EduTrack
            <div className="text-lg font-light pt-10 text-justify">
              EduTrack simplifies the complex process of academic review,
              offering real-time insights into program performance and faculty
              effectiveness. Embrace a streamlined approach to manage courses,
              departments, and learning objectives with ease. Our intuitive
              platform facilitates comprehensive analytics, enabling
              universities to make data-driven decisions for continuous
              improvement. EduTrack is designed to foster collaboration among
              faculty and administrative staff, ensuring a cohesive and
              well-coordinated educational strategy. Experience a seamless
              integration with your existing university systems, enhanced by
              robust security and customizable reporting tools. Elevate your
              institution's educational standards and achieve accreditation
              goals effortlessly with EduTrack - where innovation meets academic
              excellence.
            </div>
            <Button
              variant={"outline"}
              className="text-2xl font-medium py-7 mt-10 border-black hover:bg-black hover:text-white"
            >
              <Link href="/dashboard">GET STARTED</Link>
            </Button>
          </div>
          <div className="hidden lg:block flex-1 relative w-[50%]">
            <Image
              src="/landing-owl.png"
              alt="Descriptive Alt Text"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
