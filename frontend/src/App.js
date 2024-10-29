import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./theme";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

const AppHeader = styled.header`
  background-color: ${(props) => props.theme.colors.surface};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: ${(props) => props.theme.spacing.md};
  box-shadow: ${(props) => props.theme.shadows.sm};
`;

const AppContent = styled.main`
  padding: ${(props) => props.theme.spacing.md};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <AppHeader>
          <h1 style={{ margin: 0, color: theme.colors.text.primary }}>
            Pipeline Builder
          </h1>
        </AppHeader>
        <AppContent>
          <PipelineToolbar />
          <PipelineUI />
          <SubmitButton />
        </AppContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
