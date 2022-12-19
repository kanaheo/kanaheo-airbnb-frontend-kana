import useHostOnlyPage from "../components/HostOnlyPage";
import useProtectedPage from "../components/ProtectedPage";

export default function UploadRoom() {
  useProtectedPage();
  useHostOnlyPage();
  return <h1>kjaskdfjaksdfj</h1>;
}
