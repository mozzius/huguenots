import Image from "next/image";

import classes from "./header.module.css";

export const Header = () => {
  return (
    <header className={classes.header}>
      <Image src="/huguenot_logo.svg" alt="Huguenot Services Limited" width={40} height={40} />
      <div className={classes.settings}>
        <div className={classes.image}>
          <Image src="/union_jack.svg" alt="Union Jack flag" width={20} height={20} />
        </div>
        <p>Professional Investor</p>
      </div>
    </header>
  );
};
