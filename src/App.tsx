import Layout from "./components/Layout";
import { brandContent } from "./data/brandContent";

export default function App() {
  return <Layout sections={brandContent} />;
}