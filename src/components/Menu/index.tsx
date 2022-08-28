import React, { useRef } from 'react';
import { BookOpen, Code, Info, MessageCircle } from 'react-feather';
import styled from 'styled-components';
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { ApplicationModal } from '../../state/application/actions';
import { useModalOpen, useToggleModal } from '../../state/application/hooks';

import { ExternalLink } from '../../theme';

const StyledMenuIcon = styled(MenuIcon)`
    path {
        stroke: ${({ theme }) => theme.text1};
    }
`;

const StyledMenuButton = styled.button`
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    margin: 0;
    padding: 0;
    height: 35px;
    background-color: ${({ theme }) => theme.bg3};

    padding: 0.15rem 0.5rem;
    border-radius: 0.5rem;

    :hover,
    :focus {
        cursor: pointer;
        outline: none;
        background-color: ${({ theme }) => theme.bg4};
    }

    svg {
        margin-top: 2px;
    }
`;

const StyledMenu = styled.div`
    margin-left: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border: none;
    text-align: left;
`;

const MenuFlyout = styled.span`
    min-width: 8.125rem;
    background-color: ${({ theme }) => theme.bg3};
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
        0px 24px 32px rgba(0, 0, 0, 0.01);
    border-radius: 12px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    position: absolute;
    top: 2.6rem;
    right: 0rem;
    z-index: 100;
`;

const MenuItem = styled(ExternalLink)`
    flex: 1;
    padding: 0.5rem 0.5rem;
    color: ${({ theme }) => theme.text2};
    :hover {
        color: ${({ theme }) => theme.text1};
        cursor: pointer;
        text-decoration: none;
        opacity: 0.6;
    }
    > svg {
        margin-right: 8px;
    }
`;

const CODE_LINK = 'https://github.com/Uniswap/uniswap-v3-info';

export default function Menu() {
    const node = useRef<HTMLDivElement>();
    const open = useModalOpen(ApplicationModal.MENU);
    const toggle = useToggleModal(ApplicationModal.MENU);
    useOnClickOutside(node, open ? toggle : undefined);

    return (
        // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
        <StyledMenu ref={node as any}>
            <StyledMenuButton onClick={toggle}>
                <StyledMenuIcon />
            </StyledMenuButton>

            {open && (
                <MenuFlyout>
                    <MenuItem id="link" href="https://beets.fi/">
                        <Info size={14} />
                        About
                    </MenuItem>
                    <MenuItem id="link" href="https://docs.beethovenx.io/">
                        <BookOpen size={14} />
                        Docs
                    </MenuItem>
                    <MenuItem id="link" href={CODE_LINK}>
                        <Code size={14} />
                        Github
                    </MenuItem>
                    <MenuItem id="link" href="https://discord.gg/jedS4zGk28">
                        <MessageCircle size={14} />
                        Discord
                    </MenuItem>
                </MenuFlyout>
            )}
        </StyledMenu>
    );
}