import { getTemplates, Template } from '@/api/getTemplates';
import { useCallback } from 'react';
import { useQuery } from 'react-query';

export const useTemplates = ({
  onSuccess
}: {
  onSuccess: (templates: Template[]) => void
}) => {
  const onSuccessCb = useCallback(onSuccess, []);
  const { data: templates, isLoading } = useQuery(
    'templates',
    getTemplates,
    {
      onSuccess: onSuccessCb,
    }
  );
  return {templates, isLoading};
};