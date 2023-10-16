import { useData } from "@/app/hooks/useData";
import { deleteAccount } from "@/app/redux/state/slices/auth/updateAccount";
import { Box, Typography, Button } from  "@mui/material"
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const DeleteAccount = () => {
  const { offline, userInfo } = useData()
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (offline) {
      router.replace(`/auth/login?returnUrl=${pathname}`);
    }
  }, [router, offline, pathname]);

  const dispatch = useDispatch()

  return (
    <Box>
      <Typography variant="body1" className="!font-bold !text-[17px]">
        Delete Account
      </Typography>
      <Box className="mt-5 pl-5">
        <Typography variant="body2" className="!font-bold">
          Are You Sure You Want to Delete Your MamaFeeds Account?
        </Typography>
        <Typography variant="caption" className="!text-[13px]">
          This action is irreversible and will permanently remove all associated
          data:
        </Typography>
        <br />
        <br />
        {/* "" */}
        {/* "" */}
        {/* "" */}
        {/* "" */}
        <Typography variant="body2" className="!font-bold !mt-5 !mb-2">
          Account Information:
        </Typography>
        <ul className="list-disc pl-5 !text-[13px] mb-5">
          <li className="mb-2 ml-2">
            Full Name: {`${userInfo.firstname} ${userInfo.lastname}`}
          </li>
          <li className="mb-2 ml-2">Email Address: {userInfo.email}</li>
          <li className="mb-2 ml-2">Contact Number: {userInfo.phone}</li>
        </ul>
        {/* "" */}
        {/* "" */}
        {/* "" */}
        {/* "" */}
        <Typography variant="body2" className="!font-bold !mt-5 !mb-2">
          Account Data:
        </Typography>
        <ul className="list-disc pl-5 !text-[13px]">
          <li className="mb-2 ml-2">
            Order History: Details of past orders, including product purchases
            and transaction history.
          </li>
          <li className="mb-2 ml-2">
            Saved Addresses: Any shipping or billing addresses you&lsquo;ve
            added to your account.
          </li>
          <li className="mb-2 ml-2">
            Preferences and Settings: Customized settings, such as notification
            preferences and currency selection.
          </li>
        </ul>
        {/*  */}
        {/*  */}
        {/*  */}
        <br />
        <Typography variant="body2" className="!text-[13px] !mt-5">
          Deleting your account will result in the loss of all your account
          records, including order history and personal preferences. Please note
          that this action cannot be undone.
        </Typography>
        {/*  */}
        {/*  */}
        {/*  */}
        <Typography variant="body2" className="!text-[13px] !mt-5">
          Deleting your account will result in the loss of all your account
          records, including order history and personal preferences. Please note
          that this action cannot be undone.
        </Typography>
        {/*  */}
        {/*  */}
        {/*  */}
        <Typography variant="body2" className="!text-[13px] !mt-5">
          To proceed with deleting your account, click the &ldquo;Delete
          Account&ldquo; button below. Please ensure that you have carefully
          considered the consequences of deleting your account before
          proceeding.
        </Typography>
        {/*  */}
        {/*  */}
        {/*  */}
        <Typography variant="body2" className="!text-[13px] !mt-5">
          If you have any concerns or believe this deletion was made in error,
          please contact our customer support team at [Customer Support Email]
          or [Customer Support Phone Number] for assistance.
        </Typography>
        {/*  */}
        {/*  */}
        {/*  */}
        <Typography variant="body2" className="!text-[13px] !mt-5">
          Thank you for your past association with MamaFeeds. We respect your
          decision and appreciate your trust in our platform.
        </Typography>
      </Box>

      <Box className="float-right !mt-6 !mb-8">
        <Button
          variant="contained"
          className="!rounded-full !w-60 h-9"
          onClick={() => deleteAccount(dispatch)}
        >
          Confirm Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteAccount;
