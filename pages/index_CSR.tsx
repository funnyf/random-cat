import { NextPage } from "next";
import { useEffect, useState } from "react";

const IndexPageC: NextPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImage().then((newImage) => {
      setImageUrl(newImage.url);
      setLoading(false);
    });
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false)
  }

  return (
    <div>
      <button onClick={handleClick}>他の猫を見る CSR</button>
      <div>{loading || <img src={imageUrl} />}</div>
    </div>
    )
};

export default IndexPageC;

type Image = {
  url: string;
};
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images.alt);
  return images[0];
};

//fetchImage();
