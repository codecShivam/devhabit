import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";

export function SignIn({
  openSignIn,
  handleOpenSignIn,
  handleOpenSignUp,
  setOpenSignIn,
}) {
  return (
    <>
      <Button
        onClick={handleOpenSignIn}
        variant="text"
        size="sm"
        color="blue-gray"
      >
        Sign In
      </Button>

      <Dialog
        size="xs"
        open={openSignIn}
        handler={handleOpenSignIn}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" size="lg" />
            <Input label="Password" size="lg" />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpenSignIn} fullWidth>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                variant="small"
                color="blue"
                className="ml-1 font-bold cursor-pointer"
                onClick={() => {
                  handleOpenSignUp();
                  handleOpenSignIn();
                }}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
