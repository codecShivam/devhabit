import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Chip,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  UserCircleIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
  FlagIcon,
  UsersIcon,
  FolderIcon,
  Square3Stack3DIcon,
  RocketLaunchIcon,
  FaceSmileIcon,
  PuzzlePieceIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";

const colors = {
  blue: "bg-blue-50 text-blue-500",
  orange: "bg-orange-50 text-orange-500",
  green: "bg-green-50 text-green-500",
  "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
  purple: "bg-purple-50 text-purple-500",
  teal: "bg-teal-50 text-teal-500",
  cyan: "bg-cyan-50 text-cyan-500",
  pink: "bg-pink-50 text-pink-500",
};

const navListMenuItems = [
  {
    color: "blue",
    icon: FlagIcon,
    title: "About us",
    description: "Learn about our story and our mission statement.",
  },

  {
    color: "green",
    icon: UsersIcon,
    title: (
      <div className="flex items-center gap-1">
        Mentorship{" "}
        <Chip
          size="sm"
          color="green"
          variant="ghost"
          value="AI Mentor"
          className="capitalize"
        />
      </div>
    ),
    description: "AI-driven guidance for personal development",
  },
  {
    color: "blue-gray",
    icon: FolderIcon,
    title: "Contact us",
    description: "Feel free to contact us anytime.",
  },
  {
    color: "purple",
    icon: RocketLaunchIcon,
    title: "Personalised Learning Paths",
    description: "Checkout now!",
  },
  {
    color: "teal",
    icon: FaceSmileIcon,
    title: "Community Engagement",
    description:
      "Enhancing participation and collaboration within communities.",
  },
  {
    color: "cyan",
    icon: PuzzlePieceIcon,
    title: "Streak Tracking",
    description: "Track your work by maintaing streaks.",
  },
  {
    color: "pink",
    icon: GiftIcon,
    title: "Open Source",
    description: "List of all our open-source projects, it's all free.",
  },
];

const getNavLinkPath = (title) => {
  const path = {
    "About us": "/about",
    "Contact us": "/contact",
    "Personalised Learning Paths": "/roadmap",
    "Community Engagement": "/community",
    "Streak Tracking": "/streak",
    "Open Source": "/opensource",
  };
  return path[title] || "/mentorship";
};

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(
    ({ icon, title, description, color }, key) => (
      <NavLink to={getNavLinkPath(title)} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className={`rounded-lg p-5 ${colors[color]}`}>
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm"
            >
              {title}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {description}
            </Typography>
          </div>
        </MenuItem>
      </NavLink>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-normal">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" />
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <NavLink to="/roadmap">
        <Typography
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <CubeTransparentIcon className="h-[18px] w-[18px]" />
            Roadmap Generator
          </ListItem>
        </Typography>
      </NavLink>
      <NavListMenu />
      <NavLink to="/profile">
        <Typography
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <UserCircleIcon className="h-[18px] w-[18px]" />
            Account
          </ListItem>
        </Typography>
      </NavLink>
    </List>
  );
}

function ProfileSection({ user, handleSignOut }) {
  const [isProfileMenuOpen, setProfileMenuOpen] = React.useState(false);

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen((prev) => !prev);
  };

  const handleSignOutClick = () => {
    handleSignOut();
    setProfileMenuOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        {!isProfileMenuOpen && (
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={handleProfileMenuToggle}
          />
        )}
        {isProfileMenuOpen && (
          <div className="fixed top-0 right-0 bg-white z-50">
            <Menu
              open={isProfileMenuOpen}
              handler={setProfileMenuOpen}
              offset={{ mainAxis: 36, crossAxis: -12 }}
              placement="bottom-end"
            >
              <MenuHandler>
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.photoURL}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <Typography variant="h6" color="blue-gray">
                        {user.displayName}
                      </Typography>
                      <Typography variant="small" color="gray">
                        {user.email}
                      </Typography>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      onClick={handleSignOutClick}
                      variant="gradient"
                      size="sm"
                      fullWidth
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              </MenuHandler>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
}
function NavbarMenu() {
  const { user, handleSignOut } = useFirebase();
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="max-w-full bg-transparent px-4 py-2 rounded-none">
      <div className="flex items-center justify-between text-blue-gray-900 ">
        <NavLink to="/">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          >
            Devhabit
          </Typography>
        </NavLink>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <ProfileSection user={user} handleSignOut={handleSignOut} />
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
            Sign In
          </Button>
          <Button variant="gradient" size="sm" fullWidth>
            Sign Up
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default NavbarMenu;
