import { Helmet } from "react-helmet";

const Meta = React.memo(({ title, description, image }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
});

Meta.displayName = "Meta";

export default Meta;
