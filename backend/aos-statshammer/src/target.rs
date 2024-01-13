use crate::abilities::RerollType;

/// Represents a target to measure a [`units`](crate::Unit) capabilities against.
///
/// # Example
///
/// A basic target is one that just has a save characteristic and no extra abilities.
///
/// ```
/// # use aos_statshammer::Target;
/// let _ = Target::new(4);  // A target with a 4+ save
/// ```
#[derive(Debug, Clone, Copy)]
pub struct Target {
    pub save: u8,
    pub rerolls: Option<RerollType>,
    pub ward: Option<u8>,
    pub ethereal: bool,
}

impl Target {
    /// Constructs a new `Target` with a given save characteristic.
    pub fn new(save: u8) -> Self {
        Self {
            save,
            rerolls: None,
            ward: None,
            ethereal: false,
        }
    }

    /// Add the ability for the target to reroll save rolls (using a specific [`RerollType`])
    ///
    /// # Example
    ///
    /// You can create a target with a 4+ save, with the ability to reroll save rolls of 1.
    ///
    /// ```
    /// # use aos_statshammer::{Target, abilities::RerollType};
    /// let target = Target::new(4).with_rerolls(RerollType::Ones);
    /// ```
    pub fn with_rerolls(mut self, reroll_type: RerollType) -> Self {
        self.rerolls = Some(reroll_type);
        self
    }

    /// Add a ward save to the target.
    ///
    /// Note that only 1 ward save can be active at a time, specifying a new one will overwrite the previous one
    ///
    /// # Example
    ///
    /// You can create a target with a 4+ save, with a ward save of 6+.
    ///
    /// ```
    /// # use aos_statshammer::Target;
    /// let target = Target::new(4).with_ward(6);
    /// ```
    pub fn with_ward(mut self, ward: u8) -> Self {
        self.ward = Some(ward);
        self
    }

    /// Add the ethereal characteristic to the target.
    /// 
    /// # Example
    /// 
    /// You can create a target with a 4+ save, which is ethereal.
    /// 
    /// ```
    /// # use aos_statshammer::Target;
    /// let target = Target::new(4).with_ethereal();
    /// ```
    pub fn with_ethereal(mut self) -> Self {
        self.ethereal = true;
        self
    }
}

impl From<u8> for Target {
    fn from(value: u8) -> Self {
        Self::new(value)
    }
}
