import Image from "next/image";
import React, { useMemo } from "react";
import styles from "./PostCard.module.scss";

//Material-UI モーダル
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//モダールのトランジション
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

//カスタムフックのインポート
import { useScroll } from "../hooks"; //TimeSlider

const style = {
  modal: {
    "&:focus": {
      outline: "none",
    },
  },
};

const PostCard = ({ post, timeClick, isVisible, setIsVisible }) => {
  //カスタムhookのuseScroll
  const postCardRef = useScroll(timeClick, setIsVisible);
  //機能①
  //ここのindex.jsでpostCardRefというref名を定義
  //useScrollの引数として、stateを想定。=>_app.jsで定義したstate、timeClickを渡す。（clickすると変わるstate）
  //②timeClickの状態は、_app.js=>index.js(Home)=>postCard.jsxの順で渡している
  // console.log(timeClick);

  //機能②
  //背景色のカスタムフック
  //現在画面内に写っているPostCardの要素を取得して、stateに保存し、背景色のカスタムフックに渡す

  // const handleClick = () => {
  //   console.log("Clicked!");
  // };

  //モーダル
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.root}>
      <figure className={styles.hover_parent} onClick={handleOpen}>
        <img src={post.image.url} alt="" />　
        <figcaption className={styles.hover_mask}>
          <div ref={postCardRef}>{post.time}</div>
        </figcaption>
      </figure>
      {/* モーダル */}
      <Modal
        open={open}
        onClose={handleClose}
        className={
          isVisible
            ? `${styles.black_visible}   ${styles.modal}`
            : `${styles.white_visible}  ${styles.modal}`
        }
        // closeAfterTransition
        // BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300000,
        }}
      >
        <Fade sx={style} in={open} className={styles.box}>
          <div>
            <button className={styles.closeButton} onClick={handleClose}>
              <span>&times;</span>
            </button>
            <img src={post.image.url} alt="img" />　
            <div className={styles.post_time}>{post.time}</div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default PostCard;
