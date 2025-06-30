export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      aid_requests: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          location: string
          midnight_tx_hash: string | null
          need_score: number | null
          request_type: Database["public"]["Enums"]["aid_type"]
          status: Database["public"]["Enums"]["aid_request_status"] | null
          updated_at: string
          urgency_level: number | null
          user_id: string
          zk_proof_hash: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          location: string
          midnight_tx_hash?: string | null
          need_score?: number | null
          request_type: Database["public"]["Enums"]["aid_type"]
          status?: Database["public"]["Enums"]["aid_request_status"] | null
          updated_at?: string
          urgency_level?: number | null
          user_id: string
          zk_proof_hash?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          location?: string
          midnight_tx_hash?: string | null
          need_score?: number | null
          request_type?: Database["public"]["Enums"]["aid_type"]
          status?: Database["public"]["Enums"]["aid_request_status"] | null
          updated_at?: string
          urgency_level?: number | null
          user_id?: string
          zk_proof_hash?: string | null
        }
        Relationships: []
      }
      aid_tokens: {
        Row: {
          amount: number
          contract_address: string
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          midnight_tx_hash: string | null
          recipient_id: string
          restrictions: Json | null
          token_id: string
          token_type: Database["public"]["Enums"]["aid_type"]
          updated_at: string
          used_amount: number | null
        }
        Insert: {
          amount: number
          contract_address: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          midnight_tx_hash?: string | null
          recipient_id: string
          restrictions?: Json | null
          token_id: string
          token_type: Database["public"]["Enums"]["aid_type"]
          updated_at?: string
          used_amount?: number | null
        }
        Update: {
          amount?: number
          contract_address?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          midnight_tx_hash?: string | null
          recipient_id?: string
          restrictions?: Json | null
          token_id?: string
          token_type?: Database["public"]["Enums"]["aid_type"]
          updated_at?: string
          used_amount?: number | null
        }
        Relationships: []
      }
      distributions: {
        Row: {
          aid_request_id: string
          amount: number
          created_at: string
          distributed_at: string | null
          distributor_id: string
          id: string
          midnight_tx_hash: string | null
          recipient_id: string
          shielded_memo: string | null
          status: Database["public"]["Enums"]["distribution_status"] | null
          token_contract_address: string | null
        }
        Insert: {
          aid_request_id: string
          amount: number
          created_at?: string
          distributed_at?: string | null
          distributor_id: string
          id?: string
          midnight_tx_hash?: string | null
          recipient_id: string
          shielded_memo?: string | null
          status?: Database["public"]["Enums"]["distribution_status"] | null
          token_contract_address?: string | null
        }
        Update: {
          aid_request_id?: string
          amount?: number
          created_at?: string
          distributed_at?: string | null
          distributor_id?: string
          id?: string
          midnight_tx_hash?: string | null
          recipient_id?: string
          shielded_memo?: string | null
          status?: Database["public"]["Enums"]["distribution_status"] | null
          token_contract_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "distributions_aid_request_id_fkey"
            columns: ["aid_request_id"]
            isOneToOne: false
            referencedRelation: "aid_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      midnight_transactions: {
        Row: {
          amount: number | null
          block_height: number | null
          created_at: string
          from_address: string | null
          gas_used: number | null
          id: string
          metadata: Json | null
          shielded: boolean | null
          status: string | null
          to_address: string | null
          tx_hash: string
          tx_type: string
        }
        Insert: {
          amount?: number | null
          block_height?: number | null
          created_at?: string
          from_address?: string | null
          gas_used?: number | null
          id?: string
          metadata?: Json | null
          shielded?: boolean | null
          status?: string | null
          to_address?: string | null
          tx_hash: string
          tx_type: string
        }
        Update: {
          amount?: number | null
          block_height?: number | null
          created_at?: string
          from_address?: string | null
          gas_used?: number | null
          id?: string
          metadata?: Json | null
          shielded?: boolean | null
          status?: string | null
          to_address?: string | null
          tx_hash?: string
          tx_type?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          username: string | null
          wallet_address: string | null
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
          username?: string | null
          wallet_address?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          username?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          data: Json | null
          date_range_end: string | null
          date_range_start: string | null
          description: string | null
          generated_by: string
          id: string
          midnight_hash: string | null
          privacy_level: string | null
          report_type: string
          title: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          date_range_end?: string | null
          date_range_start?: string | null
          description?: string | null
          generated_by: string
          id?: string
          midnight_hash?: string | null
          privacy_level?: string | null
          report_type: string
          title: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          date_range_end?: string | null
          date_range_start?: string | null
          description?: string | null
          generated_by?: string
          id?: string
          midnight_hash?: string | null
          privacy_level?: string | null
          report_type?: string
          title?: string
        }
        Relationships: []
      }
      tokens: {
        Row: {
          contract_address: string | null
          created_at: string
          creator_id: string | null
          id: string
          is_active: boolean | null
          midnight_tx_hash: string | null
          name: string
          supply: number
          symbol: string
          updated_at: string
        }
        Insert: {
          contract_address?: string | null
          created_at?: string
          creator_id?: string | null
          id?: string
          is_active?: boolean | null
          midnight_tx_hash?: string | null
          name: string
          supply?: number
          symbol: string
          updated_at?: string
        }
        Update: {
          contract_address?: string | null
          created_at?: string
          creator_id?: string | null
          id?: string
          is_active?: boolean | null
          midnight_tx_hash?: string | null
          name?: string
          supply?: number
          symbol?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_verifications: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          metadata: Json | null
          midnight_proof_tx: string | null
          status: Database["public"]["Enums"]["verification_status"] | null
          user_id: string
          verification_type: string
          verified_at: string | null
          verifier_id: string
          zk_proof_hash: string | null
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          midnight_proof_tx?: string | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          user_id: string
          verification_type: string
          verified_at?: string | null
          verifier_id: string
          zk_proof_hash?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          midnight_proof_tx?: string | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          user_id?: string
          verification_type?: string
          verified_at?: string | null
          verifier_id?: string
          zk_proof_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_verifications_verifier_id_fkey"
            columns: ["verifier_id"]
            isOneToOne: false
            referencedRelation: "verifiers"
            referencedColumns: ["id"]
          },
        ]
      }
      verifier_applications: {
        Row: {
          created_at: string
          full_name: string
          id: string
          midnight_tx_hash: string | null
          motivation: string
          status: string | null
          updated_at: string
          user_id: string | null
          zk_proof_hash: string | null
          zk_verified: boolean | null
        }
        Insert: {
          created_at?: string
          full_name: string
          id?: string
          midnight_tx_hash?: string | null
          motivation: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
          zk_proof_hash?: string | null
          zk_verified?: boolean | null
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          midnight_tx_hash?: string | null
          motivation?: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
          zk_proof_hash?: string | null
          zk_verified?: boolean | null
        }
        Relationships: []
      }
      verifiers: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          location: string | null
          midnight_address: string | null
          organization: string | null
          reputation_score: number | null
          role: Database["public"]["Enums"]["verifier_role"]
          user_id: string
          verifications_count: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          midnight_address?: string | null
          organization?: string | null
          reputation_score?: number | null
          role: Database["public"]["Enums"]["verifier_role"]
          user_id: string
          verifications_count?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          location?: string | null
          midnight_address?: string | null
          organization?: string | null
          reputation_score?: number | null
          role?: Database["public"]["Enums"]["verifier_role"]
          user_id?: string
          verifications_count?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      aid_request_status: "pending" | "approved" | "rejected" | "distributed"
      aid_type:
        | "food"
        | "medical"
        | "shelter"
        | "water"
        | "education"
        | "emergency"
      distribution_status: "pending" | "completed" | "failed"
      verification_status: "pending" | "verified" | "rejected"
      verifier_role:
        | "community_leader"
        | "ngo_representative"
        | "government_official"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      aid_request_status: ["pending", "approved", "rejected", "distributed"],
      aid_type: [
        "food",
        "medical",
        "shelter",
        "water",
        "education",
        "emergency",
      ],
      distribution_status: ["pending", "completed", "failed"],
      verification_status: ["pending", "verified", "rejected"],
      verifier_role: [
        "community_leader",
        "ngo_representative",
        "government_official",
      ],
    },
  },
} as const
