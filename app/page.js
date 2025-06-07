import ButtonLogin from "@/components/ButtonLogin";
import FAQListItem from "@/components/FAQListItem";
import Image from "next/image";
import productDemo from "./productDemo.jpeg";

export default function Home() {
  let isLoggedIn = true;
  const name = "Abhishek";

  const pricingFeatureList = [
    "Collect customer feedback",
    "Admin dashboard",
    "24/7 support",
  ];
  return (
    <main>
      {/* Header */}
      <section className="bg-base-200 ">
        <div className=" flex justify-between items-center px-8 py-2 max-w-5xl mx-auto">
          <div className="font-extrabold">CodeFast</div>
          <div className="space-x-4 max-md:hidden">
            <a href="#pricing" className="link link-hover">
              Pricing
            </a>
            <a href="#FAQ" className="link link-hover">
              FAQ{" "}
            </a>
          </div>
          <div>
            <ButtonLogin isLoggedIn={isLoggedIn} msg="Log in" />
          </div>
        </div>
      </section>
      {/* Hero */}
      <section className="text-center lg:text-left lg:items-center py-32 px-8 max-w-5xl mx-auto flex flex-col justify-between gap-14 lg:flex-row">
        <div>
          <h1 className="text-4xl font-extrabold mb-6">
            Collect customer feedback to build better products
          </h1>
          <div className="opacity-80 mb-10">
            create a feedback board in minutes, prioritize features, and build
            products your customer will love
          </div>
          <ButtonLogin isLoggedIn={isLoggedIn} msg="Start 30 day trial" />
        </div>
        <Image
          src={productDemo}
          alt="Product demo"
          className="w-full rounded-2xl"
        />
      </section>
      {/* Pricing */}
      <section className="bg-base-200" id="pricing">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            Pricing
          </p>
          <h2 className="text-center text-4xl font-extrabold mb-12">
            A pricing that adapts to your needs
          </h2>
          <div className="flex gap-3">
            {/* First Card */}
            <div className="flex justify-between items-center">
              <div className="p-8 bg-base-100 max-w-96 rounded-3xl space-y-6">
                <div className="flex gap-2 items-baseline">
                  <div className="text-4xl font-black ">$19</div>
                  <div className="uppercase text-sm font-medium opacity-60">
                    /month
                  </div>
                </div>
                <ul className="space-y-2">
                  {pricingFeatureList.map((priceItem) => {
                    return (
                      <li className="flex gap-2 items-center" key={priceItem}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="text-green-600 size-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {priceItem}
                      </li>
                    );
                  })}
                </ul>
                <ButtonLogin
                  isLoggedIn={isLoggedIn}
                  msg="Buy Now"
                  extraStyle="w=full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-base-200" id="FAQ">
        <div className="py-32 px-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            FAQ
          </p>
          <h2 className="text-center text-4xl font-extrabold mb-12">
            Frequently Asked Questions
          </h2>
          <ul>
            {[
              { question: "What is your name?", answer: "My name is Abhishek" },
              { question: "Where do you live?", answer: "I live in thane" },
              { question: "what do you do?", answer: "I do business" },
            ].map((qa) => (
              <FAQListItem key={qa.question} qa={qa} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
