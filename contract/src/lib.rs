

// To conserve gas, efficient serialization is achieved through Borsh (http://borsh.io/)
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, setup_alloc};
use near_sdk::collections::Vector;
use near_sdk::AccountId;
use near_sdk::serde::{Serialize,Deserialize};

setup_alloc!();

pub type List = Vec<AccountId>;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Serialize,Deserialize)]
pub struct OwnerCar {
    history: List,
    owner_car: AccountId
}


impl Default for OwnerCar {
    fn default() -> Self {
        panic!("Should be initialized before usage")
    }
}

#[near_bindgen]
impl OwnerCar {

    pub fn new(owner : AccountId) -> OwnerCar{
        assert!(env::is_valid_account_id(owner.as_bytes()), "Invalid Account Owner");
        Self {
            owner_car:owner,
            history: Vec::new(),
        }

    }
    pub fn tranfer_owner_car(&mut self, new_owner:AccountId) {

        assert!(env::is_valid_account_id(new_owner.as_bytes()), "Invalid account address");
        let account_id = env::signer_account_id();
        assert!(account_id == self.owner_car, "Not owner");
        self.history.push(account_id);
        self.owner_car = new_owner;
    }


    pub fn get_new_owner(&self) -> String {

        self.owner_car.clone()
    }

    pub fn get_old_owner(&self) -> Vec<String>{

        let mut res = vec![];
        for i in self.history.iter(){
            res.push(i.to_owned());
        }
        res
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};

    // mock the context for testing, notice "signer_account_id" that was accessed above from env::
    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
        VMContext {
            current_account_id: "alice_near".to_string(),
            signer_account_id: "bob_near".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "carol_near".to_string(),
            input,
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view,
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }

    #[test]
    fn tranfer_owner() {
        let context = get_context(vec![], false);
        testing_env!(context.clone());
        let mut contract = OwnerCar::new(context.signer_account_id);
        contract.tranfer_owner_car("bob".to_string());
        assert_eq!(
            "bob".to_string(),
            contract.get_new_owner()
        );
    }

    #[test]
    fn check_new_owner() {
        let context = get_context(vec![], false);
        testing_env!(context.clone());
        let contract = OwnerCar::new(context.signer_account_id);
        assert_eq!(
            "bob_near".to_string(),
            contract.get_new_owner()
        );
    }


    #[test]
    fn list_old_owner() {
        let mut context = get_context(vec![], false);
        testing_env!(context.clone());
        let mut contract = OwnerCar::new(context.clone().signer_account_id);
        println!("before:{}",context.signer_account_id);
        contract.tranfer_owner_car("bob".to_string());
        assert_eq!(
            "bob".to_string(),
            contract.get_new_owner()
        );

        
        assert_eq!(
            vec!["bob_near".to_string()],
            contract.get_old_owner()
        );
        context.signer_account_id = "bob".to_string();
        testing_env!(context.clone());
        println!("after:{}",context.signer_account_id);
        println!("current_owner:{}", contract.get_new_owner());
        contract.tranfer_owner_car("feddie".to_string());
        
        /*
        assert_eq!(
            vec!["bob_near".to_string(),"feddie".to_string()],
            contract.get_old_owner()
        );
        */
    }

}
