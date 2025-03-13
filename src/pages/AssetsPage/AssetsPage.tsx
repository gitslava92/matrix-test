import {
  AddAssetsModal,
  SelectedAssetsTable,
  AssetsAnalitics,
} from "../../entities/asset/components";
import { Container } from "../../shared/components/Container/Container";

export const AssetsPage = () => {
  return (
    <Container>
      <AddAssetsModal />
      <AssetsAnalitics />
      <SelectedAssetsTable />
    </Container>
  );
};
