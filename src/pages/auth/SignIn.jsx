import React, { useEffect, useState } from "react";
import {
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from "@material-tailwind/react";

import { auth, provider, signInWithPopup } from "../../config/Firebase";
import Home from "../../components/Home";

export function SignIn() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setUser(email);
    } else {
      setIsOpen(true);
    }
  }, []);

  const handleSignIn = () => {
    signInWithPopup(auth, provider).then((data) => {
      const email = data.user.email;
      setUser(email);
      localStorage.setItem("email", email);
      setIsOpen(false);
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {user ? (
        <Home />
      ) : (
        <>
          <Dialog
            size="xs"
            className="bg-transparent shadow-none"
            open={isOpen}
            onClose={handleClose}
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
                <Typography variant="body" className="text-center">
                  To proceed, please sign in with your Google account.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button variant="gradient" fullWidth onClick={handleSignIn}>
                  Login with Google
                </Button>
               
              </CardFooter>
            </Card>
          </Dialog>
        </>
      )}
    </div>
  );
}
