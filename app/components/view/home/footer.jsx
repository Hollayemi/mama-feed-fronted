import { useTheme } from "@emotion/react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { styled, alpha } from "@mui/material/styles";
import { TestimonyCard } from "../../templates/cards";
import { useDispatch } from "react-redux";
import SwiperCentered from "../../templates/imageSlider";
import { useData } from "@/app/hooks/useData";
import { updateUserAccount } from "@/app/redux/state/slices/auth/updateAccount";
import IconifyIcon from "../../icon";

const Footer = () => {
  const pages = {
    company: [
      { name: "About Us", link: "/about-us" },
      { name: "Contact Us", link: "/contact-us" },
    ],
    product: [
      { name: "Girl's Clothing", link: "/shop/Girl's-Clothing" },
      { name: "Boy's Clothing", link: "/shop/Boy's-Clothing" },
      { name: "Maternity", link: "/shop/Maternity" },
      { name: "Layette", link: "/shop/Layette" },
      { name: "Toys", link: "/shop/Toys" },
    ],
    legal: [
      { name: "Terms of Use", link: "/terms-and-conditions?to=Terms-of-Use" },
      { name: "Privacy Policy", link: "/terms-and-conditions" },
      {
        name: "Shipping & Refund",
        link: "/terms-and-conditions?to=Shipping-&-Refund",
      },
    ],
  };
  const SetLinks = ({ pages, pre, small }) => {
    const LinkStyled = styled(Link)(({ theme }) => ({
      fontSize: "0.875rem",
      textDecoration: "none",
      color: theme.palette.primary.main,

      borderColor: theme.palette.primary.main,
    }));
    return pages.map((page, i) => (
      <LinkStyled
        key={i}
        href={page.link}
        sx={{ display: "block" }}
        color="#666"
        className="px-0 my-4 w-fit hover:border-b-2 !text-gray-400"
      >
        {page.name}
      </LinkStyled>
    ));
  };

  return (
    <Box className="bg-white mt-14 pt-8 px-8">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} md={3}>
          <Image
            src="/images/logo/logo.png"
            alt="logo"
            width={100}
            height={60}
            className="ml-5"
          />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <Typography variant="body1" className="!mb-7 !font-bold">
            Company
          </Typography>
          <SetLinks pages={pages.company} small />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <Typography variant="body1" className="!mb-7 !font-bold">
            Product
          </Typography>
          <SetLinks pages={pages.product} pre="/shop" />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <Typography variant="body1" className="!mb-7 !font-bold">
            Legal
          </Typography>
          <SetLinks pages={pages.legal} small />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Typography variant="body1" className="!mb-7 !font-bold">
            Connect with us
          </Typography>
          <Box className="flex items-center">
            <IconifyIcon icon="tabler:mail-filled" className="!mr-2" />
            <Typography
              variant="body2"
              noWrap={false}
              className="px-0 my-4 w-fit !text-gray-400 !overflow-auto"
            >
              mamafeeds@help.com
            </Typography>
          </Box>
          <Box className="flex items-center flex-wrap !mt-5">
            <Link href="#">
              <IconifyIcon icon="tabler:brand-facebook" className="!mr-2" />
            </Link>
            <Link href="#">
              <IconifyIcon icon="tabler:brand-linkedin" className="!mr-2" />
            </Link>
            <Link href="#">
              <IconifyIcon icon="tabler:brand-tiktok" className="!mr-2" />
            </Link>
            <Link href="#">
              <IconifyIcon icon="tabler:brand-instagram" className="!mr-2" />
            </Link>
            <Link href="#">
              <IconifyIcon icon="tabler:brand-twitter" className="!mr-2" />
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;

export const FooterTestimonies = () => {
  return (
    <>
      <Box className="!mt-24 px-3 md:px-16">
        <Box className="mb-5">
          <Typography className="!font-bold !text-2xl text-center">
            Loved by thousands of{" "}
            <span className=" text-pink-500">Mothers</span> and{" "}
            <span className=" text-pink-500">Kids.</span>
          </Typography>

          <Typography className="text-[11px] text-center mt-8">
            What the mothers have to say about us
          </Typography>
        </Box>

        <SwiperCentered>
          <TestimonyCard
            name="Floyd Jessica"
            nameCap="California"
            pic="/images/more/boy.png"
            text="As a busy mom of two, I value convenience and quality. MamaFeeds exceeded my expectations. The 24-hour delivery option saved me during last-minute emergencies."
          />
          <TestimonyCard
            name="Amuroko Joy"
            nameCap="Nigeria"
            pic="/images/more/girl.png"
            text="As a busy mom of two, I value convenience and quality. MamaFeeds exceeded my expectations. The 24-hour delivery option saved me during last-minute emergencies."
          />
          <TestimonyCard
            name="Floyd Jessica"
            nameCap="California"
            pic="/images/more/boy.png"
            text="As a busy mom of two, I value convenience and quality. MamaFeeds exceeded my expectations. The 24-hour delivery option saved me during last-minute emergencies."
          />
        </SwiperCentered>
      </Box>

      <Box className="w-full px-3 md: !mt-14 flex justify-center">
        <Box className="w-full md:w-3/5 !h-72 px-6 md:px-24 bg-pink-500 rounded-2xl flex flex-col items-center justify-center">
          <Typography
            variant="body1"
            className="!text-[16px] md:!text-2xl text-white !font-bold !text-center leading-8 !mb-8"
          >
            Countdown to Joy: Get Ready to Welcome Your Little One!
          </Typography>
          <Typography
            variant="caption"
            className="text-[11px] text-white !text-center leading-5 !mb-8"
          >
            Explore our collection of adorable baby clothes and maternity wear,
            lovingly designed to accompany you on this beautiful journey.
          </Typography>
          <Button
            variant="contained"
            bgcolor="white"
            size="large"
            className="!text-xs !rounded-full !bg-white !text-pink-500"
          >
            Shop Now
          </Button>
        </Box>
      </Box>
      <TheSubscribeButton />
    </>
  );
};

export const TheSubscribeButton = () => {
  const dispatch = useDispatch();
  const { userInfo } = useData();
  return (
    <Box className="mt-24 px-3 md:px-16  flex-col md:flex md:justify-between items-center">
      <Typography variant="body1" className="">
        Stay up to date with our news, ideas and updates
      </Typography>
      <Button
        variant="contained"
        bgcolor="white"
        size="large"
        className="!text-xs h-10 !mt-2 md:!mt-0 !rounded-full !bg-pink-500"
        onClick={(e) =>
          updateUserAccount({ news_letter: !userInfo.news_letter }, dispatch)
        }
      >
        {!userInfo.news_letter ? "Subscribe Now" : "Unsubscribe"}
      </Button>
    </Box>
  );
};
