import { useNavigate } from "react-router";
import { cardPreview } from "@interfaces/movies.ts";

import "./ProductCard.css";

interface ProductCardProps {
  data: cardPreview;
}

const ProductCard = ({ data }: ProductCardProps) => {
  const skeletonUrl =
    "https://kinopoisk-ru.clstorage.net/B2Z983y48/d45fe0AQ/Q0-uE6iAq8Yglklm1JfXmRrMW_WtmtvkKqOYOtLgNcxBVtZrAapdPm83VXUK8BKpjsH_8cdZZ7WbVwrCbTDQMVI_79copJqmQVP4d1QX0yl6bd9EyYrKZdowmsgwYyaKYhVk6XILfK9fJ9UVOtHivc7ACwGmmqCxChTcE86DgrAgPNxnXiQZdQNkG9eG1HGK6d9ehdj9CnW604ppoCNXC5FWhGhDaGxMi7blpTlCcF-vQh6BhehBh8ml75L_gVGhw0-9ZH41WrTTFVjUNURDuor__HQq_kr0mIJaaUPz9kijR2aqwkh_fGj3t2cYkPFOz0L9YGWoYed4l89hrIEiEqK_7Ub-1VqGA0WqJhU1oirL7ZwFyvzq1HsSy4iAUVYogbfHi2BKnL1pZ6YVuhGQLg1izXBkiyHkidceQ84i4mGgfv8GveQJR6MFKzTWd4Ba6A3_hrqfune6I3uJI2GXalPVlgrjqJ8c24Wllpmgsm4uss8Sx7vgJHjHjWI-oDIggN_PB1zXCTUB1ljnNPUSOMuvPZTYLGu02NNbeXFgVmoTFIQ7Edr_7XjnVJaJItIOfoJeQcaKMaYLN10yLOEzMeNOHwQ-xxk2o1QqNNVE4gkaLH6UujyrJ8gR-eqiE9Xa4CdXyVD7nlyb1DU0yUCAPPzzjmLXazJECpY-Qk7yAjJSPY1HjscpNKD3SQandrJryR1Np7svSWWpU6u7oJB3KMOGx4kAGQ8tKXQlR2rQgj7-c77SJUviF-lXnvM-QNIDwP4N5K81eQQBlAk39jdweemuTZWr7WoGCMPIeNCjJinztcWroFt9zNqEZcd6kWC9n4JuYdaJEMQrRd4QXiNSoFNcHHdcxJv3Qsf5pDSnwUkZnJwES61K1Phzukry8YfY4JUGqaApLR4bdzbm2hHR7n8gTsBVWvIXGAfMoc0yM_HzTD9WH3cah6DGW_VVB_Ho--5f1epfW_W646prUOB3WDO2x-hyCT9dCpXnd0qD8BxNob0h5WlDBCqlLQBPILLxIQyNV11Wuqdwl2lVdSVBaPiNzZa6vouEeCNYOKPxNygiJbZ5o8qNbrsHlOWocJNeDrDvwRbJouUbxb2iPlOjEDOcHQVsZygUQ0SZZuTU44vqv_536lxpJtvDiAmDIYfqgHXlCHDazOwaZVcUq3DRzDzz7WDlicNUCVc9QRzS05NRDuxnTlSY5pO3egc2J8H5en38FHocacZLEhgLUPB2alMmZumA-v-_iFWnJrpwos-dIgxz1RoTJ6mljOP84HOiQy2sVhwWqvTTtao3RMVBiQpdfiXr7LgFKiOKmpNAhCrgd-c40Arv_hhVRTaqA4Jd77OdggeaQjV6Fn7xjgNzwaD_7Fev1onFkufY9IYXUUvKD75X-C1rhYjjmQiw8zf5EweUq_DYHPzL5lbm2rBD3R3CLJBnSdIn29TvsQ6hU_GSr61FTiTIZ5EWmwbkZqDqmb4tJFqfqPU6cuq4QeH2WbA05lnB2E---tWmtFjgUK79As3yVPoQ1kmU7iHfcmEDI26PdO7XeDZjhbp3JBUT-Kmf_0bLDollqqDrWWCQJ2mDtuWKY4ttnWi2FSXIwDB9TKAMsqTrg2SJ91yDnXOCs2EOD3Rfd9sXMNeplLbFsam67w8WWSxLxMqQCQmxIeXpgSfkKJJKXxza97Ski0JQLF7hH_CWu-BF6RdcE_zxMzFCbE12nXb790PlS4dG18B5Cb-ul4i9SwY5A7n4YiBkClMUpdkRe6y8-xR2lQqTk93PQn9RBWkjZRq0L0JNQ1GxQS--JC02GQaxNnk1VDWSWdmODgQ4fKsm6XHqe0Bgl9mBhJcJELrNb7unhcWqMkL9_yHv0ue6U7SrFQxAbjNB4FCe3YYc1ioG0eZ6ZdREcGibH_-GOszYZSqxGBmAgJc70ycWCXKKvFyL16fVOaNwDe6QP6EHWdMn-UVtMk-ygrNiHA_2LzZrNXCWmwT3N1I4qL3t9vnNa6apYmo4QjJEGkAnRsmAmF3O6lbGtFhSQD1v4M5jh9pwFUsU_UH-84HxcN5fBU3WCWdT1jsEtGbS6Ts_f1fanGp1iIOau2LSpkvzhcb7kWktDhhVFKd5EgCPf5HvsiWZ4SYYF77j3JNyE9LuThb-hQnHA3RIVuS1cGkq3w6Huh54BnkRCgoQI0U7o0aV-uHZDI9bRwakeOFyzD2h3yMnK7LniwdvQY7Q4rBwHPx2jBTYhwA1mzbnFyPqmn2sB4n-6aaaU0ipcRBFuaGE1_sAa1-NeNX3tktD4t7fAh0h1ojSRer2fsLtIjPDE1xd5lzGOmTCNqll9GbB-xhOTRbLrvm0-sD56NBBR8pj57aJcal8rWplp2X5sHC9noA9oBUa86Q5ldywTvBxAUJPjDQ-NHrUI9WKV0a1gjjY3C8mGA2qxsnSSkqQ8zULARdmaNHKTb6r9ga1O6BTPz0yLuH225HX6vR84m0y47NQ7-8Gjybr1CIHWdU2tMLrq7x_5TvfWHQaMHurcCOEanEHZNsRuv9viyR3xehhcs3tEv-R5MlBVHlnz0OekVIDYL6-hx7XCdaS9ZoXpleDaviPjTbITtgUyvJLC1CRt0mT5Qa4gLutH0sX5PboEjKPv6DPoEUIUSYol1yA_IMDwXK93bUMR2gE0WUpBuWFAblare20Su1YRxvC6hlTAyTawFWkuMOKfp6Ix9Xl60Jwbe6Q_xEHCSMVKzRcwU2AoeHyrl23DWaK5PL2K1cnh4Npys1P5kqMqAZ4EFiY4LG22GK3ZDsBmk78itVH1zlCwn9PIp6BJLgzpRnlv0DswIJBoT2sFq_UKDaANih3B0UhOUpsPFRLrAtmCeJL2OEQl_rjB7Wp0okMzxrWR7bJslE93zCso4RaEBeZZj5CTYKjgFAsfeS95drXk2fbFUVGwAla7m0WSh9KBath2xsCsXXI8WTEqcC7j2xYhucU2UPjX48AXHImmHLmq2X9M";
  const navigate = useNavigate();

  const navigateHandle = () => {
    navigate(`/movies/${data.id}`);
  };

  return (
    <article className="product-card__film rounded-2xl shadow-lg shadow-grey/10">
      <img
        className="w-full h-420 object-cover rounded-t-2xl cursor-pointer"
        src={data.poster.previewUrl ? data.poster.previewUrl : skeletonUrl}
        onClick={navigateHandle}
      />
      <div className="p-20">
        <h2 className="text-white font-semibold text-xl truncate">
          {data.name}
        </h2>
        {data.shortDescription && (
          <p className="mt-10 text-grey font-medium line-clamp-2">
            {data.shortDescription}
          </p>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
