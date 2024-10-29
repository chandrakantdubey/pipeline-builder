import styled from "styled-components";

export const NodeWrapper = styled.div`
  background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: ${(props) => props.theme.spacing.md};
  min-width: 280px;
  box-shadow: ${(props) => props.theme.shadows.md};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    padding: 2px;
    background: linear-gradient(
      145deg,
      ${(props) => props.borderColor || "#334155"},
      rgba(59, 130, 246, 0.5)
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    transform: translateY(-1px);
    transition: all 0.3s ease;
  }
`;

export const NodeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding-bottom: ${(props) => props.theme.spacing.sm};
  border-bottom: 1px solid rgba(51, 65, 85, 0.5);
  margin-bottom: ${(props) => props.theme.spacing.md};
  background: linear-gradient(
    90deg,
    rgba(51, 65, 85, 0.3) 0%,
    rgba(51, 65, 85, 0) 100%
  );
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: 8px 8px 0 0;
`;

export const NodeIcon = styled.div`
  font-size: 20px;
  background: linear-gradient(
    135deg,
    ${(props) => props.color || props.theme.colors.primary},
    rgba(59, 130, 246, 0.7)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
`;

export const NodeTitle = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 16px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const NodeSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.md};
  background: linear-gradient(
    145deg,
    rgba(30, 41, 59, 0.5) 0%,
    rgba(15, 23, 42, 0.5) 100%
  );
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: 8px;
`;

export const Label = styled.label`
  display: block;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 12px;
  font-weight: 500;
  margin-bottom: ${(props) => props.theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm};
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 6px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.primary};
  background: linear-gradient(145deg, #0f172a 0%, #1e293b 100%);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 16px rgba(59, 130, 246, 0.2);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm};
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 6px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.primary};
  background: linear-gradient(145deg, #0f172a 0%, #1e293b 100%);
  cursor: pointer;
  transition: all 0.3s ease;

  /* Style for dropdown options */
  & option {
    background: #1e293b;
    color: ${(props) => props.theme.colors.text.primary};
    padding: 8px;
  }

  /* Style for the select when opened */
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 16px rgba(59, 130, 246, 0.2);
  }

  /* Remove default select arrow in IE */
  &::-ms-expand {
    display: none;
  }

  /* Custom styling for select arrow */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #60a5fa 50%),
    linear-gradient(135deg, #60a5fa 50%, transparent 50%);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px);
  background-size:
    5px 5px,
    5px 5px;
  background-repeat: no-repeat;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
  }

  /* Style for disabled state */
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ModelBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.2) 0%,
    rgba(59, 130, 246, 0.1) 100%
  );
  color: ${(props) => props.theme.colors.primary};
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid rgba(59, 130, 246, 0.3);
  backdrop-filter: blur(4px);
`;
