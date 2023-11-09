/* eslint-disable @next/next/no-img-element */
"use client";
import HomeWrapper from "@/app/components/view/home";
import { FooterTestimonies } from "@/app/components/view/home/footer";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";

const AboutUs = () => {
  return (
    <HomeWrapper>
      <Box className="w-full relative bg-pink-50 flex flex-col items-center !-mt-24 !pt-32">
        <Typography
          variant="body-1"
          className="!text-3xl !font-black !text-center"
        >
          We&lsquo;re changing the <br /> whole game
        </Typography>

        <Box className="flex items-center mt-10 z-30">
          <Button
            variant="contained"
            size="large"
            className="!rounded-full !w-[150px] !h-[40px] !text-xs !shadow-none"
          >
            Shop Now
          </Button>
          <Button
            variant="outlined"
            size="large"
            className="!rounded-full !w-[150px] !h-[40px] !text-xs !shadow-none !ml-4 !text-black"
          >
            Sign Up
          </Button>
        </Box>

        <Box className="flex justify-center mt-5">
          <Image
            src="/images/more/mama-kid-4.png"
            alt="about1"
            width={200}
            height={100}
            className="!w-32 !z-30 md:!w-[320px] md:!h-[350px]"
          />
          <Image
            src="/images/more/mama-kid-5.png"
            alt="about1"
            width={200}
            height={200}
            className="!w-32 !z-30 md:!w-[320px] md:!h-[350px]"
          />
          <Image
            src="/images/more/mama-kid-6.png"
            alt="about1"
            width={200}
            height={200}
            className="!w-32 !z-30 md:!w-[320px] md:!h-[350px]"
          />
        </Box>

        <Box className="!absolute !z-0 top-60 left-60 !w-5 !h-5 !rounded-full bg-green-200"></Box>
        <Box className="!absolute !z-0 bottom-20 left-10 !w-16 !h-16 md:!w-40 md:!h-40 !rounded-full bg-blue-100"></Box>
        <Box className="!absolute !z-0 top-40 right-96 !w-16 !h-16 !rounded-full bg-gray-200"></Box>
        <Box className="!absolute !z-0 bottom-10 right-14 !w-16 !h-16 md:!w-32 md:!h-32 !rounded-full bg-pink-100"></Box>
        <Box className="!absolute !z-0 top-40 left-10 !w-10 !h-10 !rounded-full bg-slate-300"></Box>
      </Box>

      <Box className="!px-4 md:!px-16">
        <Box className="!mt-24 px-3">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box className="flex justify-center">
                <img
                  src="/images/more/mama-kid-7.png"
                  alt="product_image"
                  className="md:!w-4/5 !h-full rounded-md"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                className="!font-bold !text-2xl md:w-4/6"
              >
                <span className="text-pink-500">Embrace the Journey:</span>{" "}
                Celebrating Every Moment of Motherhood
              </Typography>

              <Typography
                variant="h5"
                className="!mt-6 !text-[12px] !mb-6 !leading-8"
              >
                <blockquote>
                  Once upon a time, in the heart of a bustling city, MamaFeeds
                  was born out of a simple yet powerful idea – to create a haven
                  of comfort, style, and connection for families embarking on
                  the beautiful journey of parenthood. Our story began with a
                  passion for celebrating the magic of these transformative
                  moments.
                </blockquote>
                <br />
                <blockquote>
                  With this vision in mind, MamaFeeds set forth on a mission to
                  redefine what baby and maternity clothing meant to families
                  worldwide. We envisioned clothing that wrapped little ones in
                  softness, that radiated warmth and happiness, and that
                  resonated with parents who craved both functionality and
                  flair. Our journey was fueled by a desire to provide pieces
                  that parents would be proud to clothe their children in,
                  pieces that would tell stories of laughter, exploration, and
                  love.
                </blockquote>
                <br />
                <blockquote>
                  Today, MamaFeeds stands as a testament to that belief. The
                  brand isn&lsquo;t just about clothing; it&lsquo;s about
                  celebrating the moments that fill a home with joy. From the
                  tiniest newborn onesies to comfortable maternity wear, each
                  piece embodies the dedication and love we put into our work.
                  We&lsquo;re not just a brand; we&lsquo;re a community united
                  by the magic of parenthood.
                </blockquote>
              </Typography>
              <br />
            </Grid>
          </Grid>
        </Box>

        <Box className="!mt-24 px-3 md:px-16">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} className="md:!pr-10">
              <Typography
                variant="body1"
                className="!font-bold !text-2xl md:w-4/6 !mb-3"
              >
                Mission <span className="text-pink-500">Statement</span>
              </Typography>

              <Typography variant="caption" className="!mt-6 md:!mt-14 !mb-6">
                At MamaFeeds, our mission is to curate a diverse collection of
                high-quality clothing from trusted brands, providing families
                with a one-stop destination to discover and embrace the magic of
                parenthood. We are dedicated to offering thoughtfully selected
                pieces that celebrate childhood, empower parents, and create
                cherished memories.
              </Typography>

              <Typography
                variant="body1"
                className="!font-bold !text-2xl md:w-4/6 !mt-16 !mb-3"
              >
                Vision <span className="text-pink-500">Statement</span>
              </Typography>

              <Typography variant="caption" className="!mt-6 md:!mt-14 !mb-6">
                Our vision is to be the premier platform that connects families
                with the finest clothing brands, fostering a sense of belonging
                and joy within the journey of parenthood. We aspire to be the
                go-to destination where parents find clothing that resonates
                with their values, stories, and aspirations, ensuring that every
                piece tells a tale of love, growth, and connection.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                className="!font-bold !text-2xl md:w-4/6 !mb-3"
              >
                Quality Commitment
              </Typography>

              <Typography
                variant="caption"
                className="!font-bold !text-[11px] md:w-4/6 !mb-3 text-pink-500"
              >
                <span className="!mr-5">01</span> Thoughtful Selection:
              </Typography>
              <br />

              <Typography
                variant="h5"
                className="!text-[13px] mt-2 !ml-9 !leading-6"
              >
                Our team meticulously selects each item in our collection from a
                range of trusted and reputable brands. We focus on materials
                that are soft on delicate skin, ensuring your little ones feel
                comfortable and cared for.
              </Typography>
              <br />
              <br />

              <Typography
                variant="caption"
                className="!font-bold !text-[11px] md:w-4/6 !mb-3 text-pink-500"
              >
                <span className="!mr-5">02</span> Durability and Longevity:
              </Typography>
              <br />

              <Typography
                variant="h5"
                className="!text-[13px] mt-2 !ml-9 !leading-6"
              >
                We believe that clothing should withstand the adventures of
                childhood. Our curated pieces are designed to grow with your
                family, offering lasting quality that stands up to playtime,
                wash after wash.
              </Typography>

              <br />
              <br />

              <Typography
                variant="caption"
                className="!font-bold !text-[11px] md:w-4/6 !mb-3 text-pink-500"
              >
                <span className="!mr-5">03</span> Ethical Sourcing:
              </Typography>
              <br />

              <Typography
                variant="h5"
                className="!text-[13px] mt-2 !ml-9 !leading-6"
              >
                We prioritize ethically sourced materials and sustainable
                practices. Our commitment to ethical sourcing extends to both
                the well-being of the people who create these pieces and the
                environment we all share.
              </Typography>
              <br />
              <br />

              <Typography
                variant="caption"
                className="!font-bold !text-[11px] md:w-4/6 !mb-3 text-pink-500"
              >
                <span className="!mr-5">04</span> Attention to Detail:
              </Typography>
              <br />

              <Typography
                variant="h5"
                className="!text-[13px] mt-2 !ml-9 !leading-6"
              >
                Every stitch, seam, and button is a testament to our dedication
                to quality. We work closely with brands that share our passion
                for craftsmanship, resulting in clothing that is not only
                beautiful but also well-made.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <FooterTestimonies />
      </Box>
    </HomeWrapper>
  );
};

export default AboutUs;

// Thoughtful Selection:
// Our team meticulously selects each item in our collection from a range of trusted and reputable brands. We focus on materials that are soft on delicate skin, ensuring your little ones feel comfortable and cared for.

// Durability and Longevity:
// We believe that clothing should withstand the adventures of childhood. Our curated pieces are designed to grow with your family, offering lasting quality that stands up to playtime, wash after wash.

// Ethical Sourcing:
// We prioritize ethically sourced materials and sustainable practices. Our commitment to ethical sourcing extends to both the well-being of the people who create these pieces and the environment we all share.

// Attention to Detail:
//  
