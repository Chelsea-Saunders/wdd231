import { toggleMenu } from './navigation.mjs';
import { setHeaderFooter as buildHeaderFooter } from './parkService.mjs';

export default function setHeaderFooter(data) {
    buildHeaderFooter(data);
    toggleMenu();
}

//buildHeaderFooter issues: https://chatgpt.com/share/6851eba4-9080-800b-be8e-c2a7cd7757b1