const metascraper = require("metascraper")([
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-logo")(),
  require("metascraper-title")(),
]);

interface IMetaDataReturn {
  title: string;
  image: string;
  description: string;
  url: string;
}

export const getMetaData = async (url: string) => {
  try {
    const html = await (await fetch(url)).text();
    const { title, image, description, logo } = await metascraper({
      html,
      url,
    });
    return {
      title: title ?? "",
      image:
        image ??
        logo ??
        "https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand.png",
      description: description ?? "",
      url,
    } as IMetaDataReturn;
  } catch (err) {
    console.error(err);
    return null;
  }
};
