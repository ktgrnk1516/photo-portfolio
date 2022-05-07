import React, { useCallback,useEffect,useState } from "react";
import Data from "./data.json";
import styles from "./TimeSlider.module.scss";

const TimeSlider = ({ handleTimeClick }) => {

  const [a2,setA2] = useState([])




  //現在の時間を起点に並び替え
  const timeNow = useCallback(() => {
    const data = Data.map((d) => d.Time);

    let time = new Date();
    let hh = time.getHours().toLocaleString("ja-JP").padStart(2, "0");
    let mm = time.getMinutes().toLocaleString("ja-JP");
    let AMPM = hh + ":" + mm;
    const result3 = AMPM.substr(0, 2);

    // console.log(result3); //15

    //現在時刻に一致するindexを調べる
    // const result1 = result.map((r) => r.node.time.substr(0, 2));
    // console.log(result1);

    let ind = data.indexOf(result3);
    // let ind = data.indexOf(12);
    // console.log(ind);

    ////ind番目の要素から最後までの要素を取り出す
    let a2 = Data.slice(ind);
    // console.log(a2);

    ////最初からind番目-1までの要素を取り出す
    let a3 = Data.slice(0, ind);
    // console.log(a3);

    //★★★★★★★★★★★結合
    a2.push(...a3);
    console.log(a2);
    setA2(a2)

    //現在時刻のものが無い時、a2じゃなくDataを使わないとバグおきそう
  }, []);

  useEffect(() => {
    timeNow();
  }, []);

  
  return (
    <div
      className={styles.root}
      // onClick={(e)=>handleTimeClick(e.target)}
    >
      <ul>
        {a2.map((data) => (
          <li key={data.id} onClick={(e) => handleTimeClick(e.target.id)}>
            <div className={styles.opa}>
              <span className={styles.ampm} id={data.idx}>
                {data.AMPM}{" "}
              </span>
              <span className={styles.time} id={data.idx}>
                {data.time}{" "}
              </span>
              <span className={styles.daynight} id={data.idx}>
                {data.DayNight}
              </span>
            </div>
            {/* <button onClick={scrollToContents}>scrollToContents！</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeSlider;
