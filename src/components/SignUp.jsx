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

export function SignUp({
  openSignUp,
  handleOpenSignUp,
  handleOpenSignIn,
  setOpenSignUp,
}) {
  return (
    <>
      <Button onClick={handleOpenSignUp} variant="gradient" size="sm">
        Sign Up
      </Button>

      <Dialog
        size="xs"
        open={openSignUp}
        handler={handleOpenSignUp}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input size="lg" label="Name" />
            <Input label="Email" size="lg" />
            <Input label="Password" size="lg" />
            <div className="-ml-2.5">
              <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    I agree the
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-gray-900"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpenSignUp} fullWidth>
              Register
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
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
                Sign in
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
