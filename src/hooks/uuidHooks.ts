import { v4 as uuidv4 } from 'uuid';

export const useGenerateUUID = () => {
    return () => uuidv4().replace(/-/g, '').substring(0, 12);
}