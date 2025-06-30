import { supabase } from '@/backend/supabase/client';

export const exportIdentityData = async () => {
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*');

    if (error) throw error;

    // Convert to CSV format
    const csvHeaders = 'ID,Username,Wallet Address,Created At,Updated At\n';
    const csvRows = profiles.map(profile => 
      `${profile.id},${profile.username || ''},${profile.wallet_address || ''},${profile.created_at},${profile.updated_at}`
    ).join('\n');
    
    const csvContent = csvHeaders + csvRows;
    
    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `identity_data_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
};
